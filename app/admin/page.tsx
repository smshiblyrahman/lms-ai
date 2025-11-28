import AdminLogOutButton from "@/components/admin/AdminLogOutButton";
import { NotesList } from "@/components/NotesList";

export default function AdminPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Notes</h1>
      <p className="text-muted-foreground">
        View and test realtime note updates
      </p>
      <AdminLogOutButton />

      <NotesList />
    </div>
  );
}
