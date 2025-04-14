import{h as E,l as L,a,I,J as H,j as e,K as O,E as n,L as z,M as _}from"./index-CYtOorbY.js";import{e as t,S as p}from"./DefaultLayout-BVsQPo94.js";import{C as R,a as F}from"./CCardBody-CdB7bGAD.js";import{C as K,a as P,b as V,c as x,d as f,e as q,f as C}from"./CTable-Dq8BXfER.js";import{c as g}from"./createLucideIcon-ogFlJnPM.js";import{C as j,a as D,b as y,c as w,d as b}from"./CModalTitle-C7VZlUGm.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],Y=g("Pencil",J);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]],G=g("Trash",$),se=()=>{const r=E(s=>s.department.items),l=L(),[o,N]=a.useState(null),[v,c]=a.useState(!1),[k,i]=a.useState(!1),[d,u]=a.useState(""),[m,T]=a.useState("");a.useEffect(()=>{I.getAllDepartments().then(s=>l(H(s)))},[l]);const B=()=>{if(!d.trim())n.error("Department name can not be empty");else if(r.some(s=>s.name.toLowerCase()===d.trim().toLowerCase())){n.error("Department already exists");return}else{const h={id:(r.length>0?Math.max(...r.map(A=>A.id))+1:1).toString(),name:d.trim()};l(_(h)),u(""),i(!1),n.success("Department added successfully")}},M=async s=>{(await p.fire({title:"Delete Department?",text:"This will delete this department!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!"})).isConfirmed&&(l(O(s)),p.fire({title:"Department deleted successfully",showCancelButton:!0,showConfirmButton:!1,cancelButtonColor:"#aaaaaa",cancelButtonText:"OK",icon:"success"}))},S=()=>{if(m===o.name)n.error("This name is current name for this department");else if(r.some(s=>s.name.toLowerCase()===m.trim().toLowerCase())){n.error("Department already exists");return}else l(z({id:o.id,name:m})),n.success("Department name has changed successfully"),c(!1)};return e.jsxs("div",{className:"m-4",children:[e.jsxs(R,{children:[e.jsxs(K,{className:"d-flex justify-content-between align-items-center",children:[e.jsx("h5",{className:"mb-0",children:"Departments"}),e.jsx(t,{color:"primary",onClick:()=>i(!0),children:"Add Department"})]}),e.jsx(F,{children:e.jsxs(P,{hover:!0,responsive:!0,children:[e.jsx(V,{children:e.jsxs(x,{children:[e.jsx(f,{children:"Department Name"}),e.jsx(f,{children:"Actions"})]})}),e.jsx(q,{children:r.map(s=>e.jsxs(x,{children:[e.jsx(C,{children:s.name}),e.jsx(C,{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx(t,{color:"primary",variant:"outline",onClick:()=>{N(s),c(!0)},children:e.jsx(Y,{size:16})}),e.jsx(t,{color:"danger",variant:"outline",onClick:()=>M(s.id),children:e.jsx(G,{size:16})})]})})]},s.id))})]})})]}),o&&e.jsx(e.Fragment,{children:e.jsxs(j,{visible:v,onClose:()=>c(!1),children:[e.jsx(D,{children:e.jsxs(y,{children:["Current Name : ",o.name]})}),e.jsx(w,{children:e.jsx("input",{className:`
          w-full px-3 py-2 
          border border-gray-300 
          rounded-md 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
        `,value:m,onChange:s=>{T(s.target.value)}})}),e.jsxs(b,{children:[e.jsx(t,{color:"secondary",onClick:()=>c(!1),children:"Cancel"}),e.jsx(t,{color:"primary",onClick:()=>{S()},children:"Save Changes"})]})]})}),e.jsxs(j,{visible:k,onClose:()=>{i(!1),u("")},children:[e.jsx(D,{children:e.jsx(y,{children:"Add New Department"})}),e.jsx(w,{children:e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"w-full",children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Name"}),e.jsx("input",{className:`
          w-full px-3 py-2 
          border border-gray-300 
          rounded-md 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
        `,value:d,onChange:s=>{u(s.target.value)}})]})})}),e.jsxs(b,{children:[e.jsx(t,{color:"secondary",onClick:()=>i(!1),children:"Cancel"}),e.jsx(t,{color:"primary",onClick:B,children:"Add Department"})]})]})]})};export{se as default};
