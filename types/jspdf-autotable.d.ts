// types/jspdf-autotable.d.ts
import 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

declare module 'jspdf-autotable' {
  const plugin: any;
  export default plugin;
}