import { useState } from "react";
import Cookies from "js-cookie";
import { Button, HStack, Textarea, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";

export const UpdateCommentModal = ({comment}) => {
    const [content, setContent] = useState(comment.content);
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const submit = async () => {
        const accessToken = Cookies.get('accessToken');
        if (comment.length === 0 || accessToken === undefined) return;
        const newContent = {content};
        await fetch(apiUrl + `/blog/${comment.blogid}/comment/${comment._id}`,
            {
                method : 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(newContent)
            }
        );
        window.location.reload();
    };

    return(
        <>
            <ModalHeader>
                Update Comment
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
            </ModalBody>
                <HStack w='100%' p='20px'>
                    <Textarea value={content} onChange={handleContentChange} placeholder='Leave a comment' h='150px' resize='none'/>
                </HStack>
            <ModalFooter>
                <Button onClick={submit} isDisabled={content.length === 0}>
                    Update
                </Button>
            </ModalFooter>
        </>
    )
}