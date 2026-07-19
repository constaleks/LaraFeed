import { Form } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface CommentFormProps {
    postId: number;
    onCommentAdded?: () => void;
}

function CommentForm({postId, onCommentAdded}: CommentFormProps) {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Leave a comment</CardTitle>
                <CardDescription>Share your thoughts about this post</CardDescription>
            </CardHeader>
            <CardContent>
                <Form action="/comments" method="post" 
                    resetOnSuccess 
                    onSuccess={() => onCommentAdded?.()}
                    options={{only: ["comments"]}}
                >
                    {({ errors, processing }) => (
                        <>
                            <input type="hidden" name="post_id" value={postId} />
                            <Textarea name="body" aria-invalid={!!errors.body} />
                            <InputError message={errors.body} />
                            <Button type="submit" className="mt-2 cursor-pointer" disabled={processing}>Add Comment</Button>
                        </>
                    )}
                    
                </Form>
            </CardContent>
        </Card>
    )
};

export default CommentForm