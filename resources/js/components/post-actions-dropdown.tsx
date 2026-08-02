
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { destroy, edit } from "@/actions/App/Http/Controllers/PostController";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { toast } from "sonner";


interface PostActionsDropdownProps {
    postId: number;
    canUpdate: boolean;
    canDelete: boolean;
}

export default function PostActionsDropdown({ postId, canUpdate, canDelete }: PostActionsDropdownProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    if (!canUpdate && !canDelete) {
        return null;
    }

    const handleDelete = () => {
        setDeleteDialogOpen(false);
        router.delete(destroy(postId), {
            onSuccess: () => {
                toast("Post deleted successfully!");
            }
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
                    <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {canUpdate ? (
                        <DropdownMenuItem render={<Link href={edit(postId)} />}>
                            <Pencil /> Edit Post
                        </DropdownMenuItem>
                    ) : ""}
                    {canDelete ? (
                        <DropdownMenuItem variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                            <Trash /> Delete Post
                        </DropdownMenuItem>
                    ) : ""}
                </DropdownMenuContent>
            </DropdownMenu>

            {canDelete && (
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your post and remove all associated comments and likes.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}