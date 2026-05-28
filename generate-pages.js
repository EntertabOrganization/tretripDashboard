const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'travel-tourism', title: 'Travel Tourism', endpoint: '/api/travel-tourism' },
  { path: 'transportation-services', title: 'Transportation Services', endpoint: '/api/transportation-services' },
  { path: 'shipping-services', title: 'Shipping Services', endpoint: '/api/shipping-services' },
  { path: 'medical-tourism', title: 'Medical Tourism', endpoint: '/api/medical-tourism' },
  { path: 'programs/hajj-umrah', title: 'Hajj & Umrah', endpoint: '/api/programs/hajj-umrah' },
  { path: 'programs/explore-usa', title: 'Explore USA', endpoint: '/api/programs/explore-usa' },
  { path: 'programs/explore-kingdom', title: 'Explore Kingdom', endpoint: '/api/programs/explore-kingdom' },
  { path: 'events', title: 'Events', endpoint: '/api/events' },
  { path: 'contact-us', title: 'Contact Us', endpoint: '/api/contact-us' },
  { path: 'clients', title: 'Clients', endpoint: '/api/clients' },
  { path: 'business-services', title: 'Business Services', endpoint: '/api/business-services' },
];

pages.forEach(p => {
  const dir = path.join('d:/Entertab/tretripDashboard/src/app/dashboard', p.path);
  fs.mkdirSync(dir, { recursive: true });
  
  const depth = p.path.split('/').length;
  // if depth = 1 (e.g. travel-tourism), relative to components is ../../components
  // if depth = 2 (e.g. programs/hajj-umrah), relative is ../../../components
  const relativePrefix = '../'.repeat(depth + 1);
  
  const content = `import CrudPage from "${relativePrefix}components/CrudPage/CrudPage";

export default function Page() {
  return <CrudPage title="${p.title}" endpoint="${p.endpoint}" />;
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

console.log('Pages generated successfully!');
