import {z} from 'zod';
export const Note=z.object({id:z.string().uuid(),title:z.string().trim().min(1).max(160),body:z.string().max(4000),column:z.enum(['To Do','In Progress','Done'])}).strict();
export const Batch=z.object({notes:z.array(Note).min(1).max(30),approvedRepository:z.string()}).strict().refine(b=>new Set(b.notes.map(n=>n.id)).size===b.notes.length,'Duplicate IDs');
export const Draft=z.object({title:z.string().min(1).max(160),body:z.string().max(4000)}).strict();
export const format={type:'object',additionalProperties:false,properties:{title:{type:'string'}},required:['title']};
export function groundDraft(content,text){const draft=JSON.parse(content);return Draft.parse({title:draft.title,body:text});}
export function columnAt(x,w){return ['To Do','In Progress','Done'][Math.min(2,Math.max(0,Math.floor(x/(w/3))))];}
export function repository(){const s=process.env.GITHUB_REPOSITORY||'';if(!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(s))throw Error('Configure GITHUB_REPOSITORY');return s;}
export function local(req){const internal=new URL(req.url);let u;try{u=new URL('http://'+req.headers.get('host'));}catch{throw Error('Local same-origin requests only');}if(req.headers.get('origin')!==u.origin||!['localhost','127.0.0.1'].includes(u.hostname)||u.port!==internal.port)throw Error('Local same-origin requests only');}
export const labels=n=>['stickyship',{'To Do':'status:todo','In Progress':'status:in-progress','Done':'status:done'}[n.column]];
