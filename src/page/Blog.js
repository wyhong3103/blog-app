import { Nav } from "../components/Nav";
import { DateTime } from "luxon";
import Cookies from "js-cookie";
import { Heading, VStack, Box, Text, Container, Textarea, HStack, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const [userId, setUserId] = useState('');
    const [comment, setComment] = useState('');
    const [logged, setLogged] = useState(0);
    const [blog, setBlog] = useState({});
    const [status, setStatus] = useState({ok : 0});
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;
    
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const convertDateTime = (timestamp) => {
        const dt = new Date(timestamp);
        return DateTime.fromJSDate(dt).toLocaleString(DateTime.DATE_MED);
    }

    const postComment = async () => {
        const accessToken = Cookies.get('accessToken');
        if (comment.length === 0 || accessToken === undefined) return;
        const content = {content : comment};
        await fetch(apiUrl + '/blog/' + id, 
            {
                method : 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(content)
            }
        );
        window.location.reload();
    }

    useEffect(
        () => {
            (async ()=>{
                const res = await fetch(apiUrl+`/blog/${id}`);
                const data = await res.json();

                if (!res.ok){
                    setStatus({
                        ok : -1,
                        error : data.err
                    })
                }else{
                    setStatus({ok : 1})
                    setBlog({...data.blog});
                }
            })();
        }
    ,[])  

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
                        setUserId(data.userid);
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


    return(
        <>
            {
                status.ok === 1 ? 
            
                <>
                <Nav/>
                <Container  maxW='1100px'>
                    <VStack p="10px" marginRight='0' gap='40px'>
                        <VStack gap='40px' w='100%'>
                            <Box w='100%'>
                                <Heading size='md' textAlign='left'>
                                    {blog.title}
                                </Heading>
                            </Box>
                            <Box p='10px' bg='#f2f2f2' borderRadius='10px' w='100%'>
                                <div dangerouslySetInnerHTML={{ __html: blog.body}} />
                            </Box>
                        </VStack>
                        <Box w='100%'>
                            <Heading fontSize='17px' textAlign='left'>
                                Comments
                            </Heading>
                        </Box>
                        {
                            blog.comments.length > 0
                            ?
                            <Flex w='100%' direction='column' gap='30px'>
                            {
                                blog.comments.map(
                                    i => {
                                        return(
                                            <Box>
                                                <HStack marginBottom='10px'>
                                                    <Text fontWeight='500'>
                                                        {i.author.username}
                                                    </Text>
                                                    <Text fontWeight='500'>
                                                        {convertDateTime(i.date)}
                                                    </Text>
                                                </HStack>
                                                <Box p='10px' bg='#f2f2f2' borderRadius='10px' w='100%'>
                                                    <Text>
                                                        {i.content}
                                                    </Text>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                )
                            }
                            </Flex>
                            :
                            null
                        }
                        {
                            logged === 1 ? 

                            <HStack w='100%'>
                                <Textarea value={comment} onChange={handleCommentChange} placeholder='Leave a comment' h='150px' resize='none'/>
                                <Button onClick={postComment}>
                                    Post
                                </Button>
                            </HStack>

                            :

                            <Text>
                                Log in to leave a comment.
                            </Text>
                        }
                    </VStack>
                </Container>

                </>

                :

                (
                    status.ok === -1 ? 
                    <>
                    <Heading>
                        404
                    </Heading>
                    {
                        status.error.map(i => {
                            return(
                                <Text>
                                {i}     
                                </Text>
                            )
                        })
                    }
                    </>

                    :

                    null
                )
            }

        </>
    )
};