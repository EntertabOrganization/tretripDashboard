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
  columns?: Column[];
  fields?: FormField[];
  fetchDetailOnEdit?: boolean;
}

type FieldType = "text" | "number" | "date" | "select" | "textarea";

interface FieldOption {
  label: string;
  value: string;
}

interface FormField {
  key: string;
  label: string;
  type?: FieldType;
  required?: boolean | ((formData: Record<string, any>) => boolean);
  options?: FieldOption[];
  placeholder?: string;
}

function normalizeApiItem(payload: any) {
  if (!payload || Array.isArray(payload)) {
    return payload;
  }

  if (payload.data && !Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.travelTourism) {
    return payload.travelTourism;
  }

  if (payload.item) {
    return payload.item;
  }

  return payload;
}

function formatDateForInput(value: any) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

function toFormValues(item: Record<string, any>, fields: FormField[]) {
  const nextFormData: Record<string, any> = {};

  fields.forEach((field) => {
    const value = item?.[field.key];

    if (field.type === "date") {
      nextFormData[field.key] = formatDateForInput(value);
      return;
    }

    if (Array.isArray(value)) {
      nextFormData[field.key] = value.join(", ");
      return;
    }

    nextFormData[field.key] = value ?? "";
  });

  return nextFormData;
}

function toSubmitPayload(formData: Record<string, any>, fields: FormField[]) {
  const payload: Record<string, any> = {};

  fields.forEach((field) => {
    const value = formData[field.key];

    if (field.key === "multipleDestinations") {
      payload[field.key] = typeof value === "string"
        ? value
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean)
        : [];
      return;
    }

    if (field.type === "number") {
      payload[field.key] = value === "" ? undefined : Number(value);
      return;
    }

    if (field.type === "date") {
      payload[field.key] = value || undefined;
      return;
    }

    payload[field.key] = value === "" ? undefined : value;
  });

  return payload;
}

export default function CrudPage({
  title,
  endpoint,
  columns: customColumns,
  fields = [],
  fetchDetailOnEdit = false,
}: CrudPageProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form state (generic)
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Dynamic columns based on data
  const [columns, setColumns] = useState<Column[]>(customColumns || [
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
      if (!customColumns && items.length > 0) {
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
      const mockData = [
        { id: "1", name: "Mock Entry 1", status: "Active", createdAt: new Date().toISOString() },
        { id: "2", name: "Mock Entry 2", status: "Pending", createdAt: new Date().toISOString() },
      ];
      setData(mockData);
      if (!customColumns) {
        setColumns([
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created At", render: (val) => val ? new Date(val).toLocaleDateString() : "-" },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const handleAdd = () => {
    setEditingItem(null);
    setFormData(
      fields.reduce<Record<string, any>>((acc, field) => {
        acc[field.key] = "";
        return acc;
      }, {})
    );
    setIsModalOpen(true);
  };

  const handleEdit = async (item: any) => {
    try {
      const id = item.id || item._id;
      let nextItem = item;

      if (fetchDetailOnEdit && id) {
        const result = await api.get(`${endpoint}/${id}`);
        nextItem = normalizeApiItem(result);
      }

      setEditingItem(nextItem);
      setFormData(fields.length > 0 ? toFormValues(nextItem, fields) : nextItem);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to load record details:", error);
      toast.error("Failed to load record details");
    }
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
        await api.put(`${endpoint}/${id}`, fields.length > 0 ? toSubmitPayload(formData, fields) : formData);
        toast.success("Record updated successfully");
      } else {
        await api.post(endpoint, fields.length > 0 ? toSubmitPayload(formData, fields) : formData);
        toast.success("Record created successfully");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(editingItem ? "Failed to update record" : "Failed to create record");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
          {fields.length > 0 ? fields.map((field) => {
            const isRequired = typeof field.required === "function"
              ? field.required(formData)
              : Boolean(field.required);

            return (
              <div key={field.key} className={styles.inputGroup}>
                <label htmlFor={field.key}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    id={field.key}
                    name={field.key}
                    value={formData[field.key] || ""}
                    onChange={handleInputChange}
                    required={isRequired}
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.key}
                    name={field.key}
                    value={formData[field.key] || ""}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    required={isRequired}
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    id={field.key}
                    name={field.key}
                    value={formData[field.key] || ""}
                    onChange={handleInputChange}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    required={isRequired}
                  />
                )}
              </div>
            );
          }) : columns.map((col) => {
            if (col.key === 'id' || col.key === '_id') return null;
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
          {fields.length === 0 && columns.length <= 1 && (
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
