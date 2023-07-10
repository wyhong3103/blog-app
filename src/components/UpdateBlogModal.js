import { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import '../style/tinymce.css';
import Cookies from "js-cookie";
import { Button, Input, Text, Flex, VStack, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@chakra-ui/react";

export const UpdateBlogModal = ({blog}) => {
    const editorRef = useRef(null);
    const [title, setTitle] = useState(blog.title);
    const [error ,setError] = useState([]);
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const submit = async () => {
      if (editorRef.current) {
        const body = { title, body : editorRef.current.getContent()};
        if (title.length === 0 || body.body.length === 0){
            setError(["Title and body must not be empty!"]);
            return;
        }
        const accessToken = Cookies.get('accessToken');
        const res = await fetch(apiUrl + `/blog/${blog._id}`, 
            {
                method : 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(body)
            }
        );
        if (res.ok){
            window.location.reload();
        } else{
            setError(["Something went wrong"]);
        }
      }
    };
    return(
        <>
            <ModalHeader>
                Update Blog
            </ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <VStack spacing='10px'>
                    <Flex direction='column' gap='10px' w='100%'>
                        <label htmlFor="title">
                            <Text fontWeight='700' fontSize='20px'>Title</Text>
                        </label>
                        <Input value={title} onChange={handleTitleChange} variant='outline' placeholder='Title' id='title'/>
                    </Flex>
                    <Flex direction='column' gap='10px' w='100%'>
                        <Text fontWeight='700' fontSize='20px'>Body</Text>
                        <Editor
                        apiKey={process.env.REACT_APP_TINY_API_KEY}
                        initialValue={blog.body}
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        />
                    </Flex>
                    {
                        error.length > 0 ?
                        <VStack>
                            {
                                error.map(
                                    i => <Text color='#ec6e6e'>{i}</Text>
                                )
                            }
                        </VStack>
                        :
                        null
                    }
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button onClick={submit}>
                    Update
                </Button>
            </ModalFooter>
        </>
    )
}