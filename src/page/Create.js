import { Nav } from "../components/Nav";
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Input, Text, Flex, VStack } from "@chakra-ui/react";

export const Create = () => {
    const editorRef = useRef(null);
    const submit = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    return (
      <>
        <Nav/>
        <VStack p='20px 150px 20px 150px' spacing='30px'>
            <Flex direction='column' gap='10px' w='100%'>
                <label htmlFor="title">
                    <Text fontWeight='700' fontSize='20px'>Title</Text>
                </label>
                <Input variant='outline' placeholder='Title' id='title'/>
            </Flex>
            <Flex direction='column' gap='10px' w='100%'>
                <Text fontWeight='700' fontSize='20px'>Body</Text>
                <Editor
                apiKey={process.env.REACT_APP_TINY_API_KEY}
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
            <Button onClick={submit}>
                Post
            </Button>
        </VStack>
      </>
    );
};