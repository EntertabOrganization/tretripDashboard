"use client";

import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import DataTable, { Column } from "../DataTable/DataTable";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";
import styles from "./CrudPage.module.css";

interface CrudPageProps {
  title: string;
  endpoint: string;
}

export default function CrudPage({ title, endpoint }: CrudPageProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form state (generic)
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Dynamic columns based on data
  const [columns, setColumns] = useState<Column[]>([
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "createdAt", label: "Created At", render: (val) => val ? new Date(val).toLocaleDateString() : "-" }
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await api.get(endpoint);
      // Assuming result is an array or result.data is an array
      const items = Array.isArray(result) ? result : result?.data || [];
      setData(items);

      // Auto-generate columns from first item if it exists
      if (items.length > 0) {
        const firstItem = items[0];
        const newCols = Object.keys(firstItem)
          .filter(key => typeof firstItem[key] !== 'object') // skip nested objects for generic table
          .slice(0, 5) // max 5 cols for clean look
          .map(key => ({
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
          }));
        
        // Ensure ID is first if it exists
        const idColIndex = newCols.findIndex(c => c.key.toLowerCase() === 'id' || c.key.toLowerCase() === '_id');
        if (idColIndex > 0) {
          const idCol = newCols.splice(idColIndex, 1)[0];
          newCols.unshift(idCol);
        }
        
        setColumns(newCols);
      }
    } catch (error) {
      console.error(`Failed to fetch ${title}:`, error);
      toast.error(`Failed to load data. The backend might be unreachable.`);
      // Mock data for demo purposes since backend might not be ready or have data
      setData([
        { id: "1", name: "Mock Entry 1", status: "Active", createdAt: new Date().toISOString() },
        { id: "2", name: "Mock Entry 2", status: "Pending", createdAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: any) => {
    const id = item.id || item._id;
    if (!id) {
      toast.error("Cannot delete item without an ID");
      return;
    }

    if (window.confirm(`Are you sure you want to delete this record?`)) {
      try {
        await api.delete(`${endpoint}/${id}`);
        toast.success("Record deleted successfully");
        fetchData();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete record");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const id = editingItem.id || editingItem._id;
        await api.put(`${endpoint}/${id}`, formData);
        toast.success("Record updated successfully");
      } else {
        await api.post(endpoint, formData);
        toast.success("Record created successfully");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(editingItem ? "Failed to update record" : "Failed to create record");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <p>Manage your {title.toLowerCase()} records here.</p>
      </div>

      <DataTable
        title={title}
        data={data}
        columns={columns}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? `Edit ${title} Record` : `Add New ${title} Record`}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          {columns.map((col) => {
            if (col.key === 'id' || col.key === '_id') return null; // Don't edit ID
            return (
              <div key={col.key} className={styles.inputGroup}>
                <label htmlFor={col.key}>{col.label}</label>
                <input
                  type="text"
                  id={col.key}
                  name={col.key}
                  value={formData[col.key] || ""}
                  onChange={handleInputChange}
                  placeholder={`Enter ${col.label.toLowerCase()}`}
                  required
                />
              </div>
            );
          })}
          
          {/* If there are no columns to show (empty data case), show generic inputs */}
          {columns.length <= 1 && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                />
              </div>
            </>
          )}

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editingItem ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
