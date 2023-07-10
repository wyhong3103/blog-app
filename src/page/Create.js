import { Nav } from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from "js-cookie";
import { Button, Input, Text, Flex, VStack, Center, FormErrorMessage } from "@chakra-ui/react";

export const Create = () => {
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [logged, setLogged] = useState(0);
    const [error ,setError] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const submit = async () => {
      if (editorRef.current) {
        const body = { title, body : editorRef.current.getContent()};
        const accessToken = Cookies.get('accessToken');
        const res = await fetch(apiUrl + '/blog', 
            {
                method : 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(body)
            }
        );
        if (res.ok){
            navigate('/');
        } else{
            setError(["Something went wrong"]);
        }
      }
    };

    //check if logged in 
    useEffect(
        () => {
            (async ()=>{
                const accessToken = Cookies.get('accessToken');
                if (accessToken !== undefined){
                    const res = await fetch(apiUrl + '/verify', 
                        {
                            method : 'POST',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    );
                    const data = await res.json();

                    if (data.status){
                        setLogged(1);
                    }else{
                        setLogged(-1);
                        Cookies.remove('accessToken');
                    }
                }else{
                    setLogged(-1);
                }
            })();
        }
    ,[])

    return (
      <>
        <Nav/>
        {
            logged === 1 ?
            <VStack p='20px 150px 20px 150px' spacing='30px'>
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
                {
                    error.length > 0 ? 
                    <VStack>
                        {
                            error.map(
                                i => <FormErrorMessage>{i}</FormErrorMessage>
                            )
                        }
                    </VStack>
                    :
                    null
                }
            </VStack>
            :
            (
                logged === -1 ? 
                <Center>
                    <Text>
                        Please log in to start creating blog.
                    </Text>
                </Center>
                :
                null
            )
        }
      </>
    );
};