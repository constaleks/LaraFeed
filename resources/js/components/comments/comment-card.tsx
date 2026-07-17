import { Comment } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CommentCardProps {
    comment: Comment;
}

function CommentCard({comment}: CommentCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="h-11 w-11 shrink-0 rounded-full bg-muted" />
                        {comment.user?.name}
                    </div>
                </CardTitle>
                <CardDescription>
                    {new Date(comment.created_at).toLocaleString("en-US", {
                        dateStyle: "long",
                        timeStyle: "short",
                    })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {comment.body}
            </CardContent>
        </Card>
    )
};

export default CommentCard;