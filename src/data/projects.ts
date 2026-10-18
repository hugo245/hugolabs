export interface ProjectConcept { readonly name: string; readonly category: string; readonly description: string; readonly accent: string; readonly tags: readonly string[]; }

export const projectConcepts: readonly ProjectConcept[] = [
  { name: 'Sentinel', category: 'Discord moderation concept', description: 'A moderation bot concept with rule logs, ticket routing, and a clear set of controls for staff.', accent: '#1268ff', tags: ['Moderation', 'Audit log', 'Tickets'] },
  { name: 'Forma', category: 'Business website concept', description: 'A website concept for a small design business. The layout puts the work first and keeps the route to an inquiry short.', accent: '#00a8ff', tags: ['Website', 'Responsive', 'Motion'] },
  { name: 'Orbit', category: 'Automation concept', description: 'An automation concept that receives an event, checks its data, and sends the result to the right team.', accent: '#06080c', tags: ['Automation', 'API', 'Workflow'] },
] as const;
