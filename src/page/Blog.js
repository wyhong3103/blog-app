import { Nav } from "../components/Nav";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UpdateBlogModal } from "../components/UpdateBlogModal";
import { UpdateCommentModal } from "../components/UpdateCommentModal";
import { Heading, VStack, Box, Text, Container, Textarea, HStack, Button, Flex, Spacer, Link, useDisclosure, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updateData, setUpdateData] = useState({});
    // 0 = blog, 1 = comment
    const [updateTarget, SetUpdateTarget] = useState(0);

    const [userId, setUserId] = useState('');
    const [comment, setComment] = useState('');
    const [logged, setLogged] = useState(0);
    const [blog, setBlog] = useState({});
    const [status, setStatus] = useState({ok : 0});
    const navigate = useNavigate();
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

    const deleteBlog = async () => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken === undefined) return;
        await fetch(apiUrl + `/blog/${id}`, 
            {
                method : 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }
        );
        navigate('/');
    }

    const deleteComment = async (commentid) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken === undefined) return;
        await fetch(apiUrl + `/blog/${id}/comment/${commentid}`, 
            {
                method : 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }
        );
        window.location.reload();
    }

    const updateBlog = () => {
        onOpen();
        setUpdateData({...blog});
        SetUpdateTarget(0);
    }

    const updateComment = (comment) => {
        onOpen();
        comment.blogid = id;
        setUpdateData({...comment});
        SetUpdateTarget(1);
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
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        {
                            updateTarget === 0 ? 
                            <UpdateBlogModal blog={updateData}/>
                            :
                            <UpdateCommentModal comment={updateData}/>
                        }
                    </ModalContent>
                </Modal>
                <Nav/>
                <Container  maxW='1100px'>
                    <VStack p="10px" marginRight='0' gap='40px'>
                        <VStack w='100%'>
                            <Box w='100%' marginBottom='20px'>
                                <Heading size='md' textAlign='left'>
                                    {blog.title}
                                </Heading>
                            </Box>
                            <Flex w='100%' direction='row'>
                                <HStack>
                                    <Text>
                                        By
                                    </Text>
                                    <Text fontWeight='500'>
                                        {blog.author.username}
                                    </Text>
                                    <Text>
                                        on
                                    </Text>
                                    <Text fontWeight='500'>
                                        {convertDateTime(blog.date)}
                                    </Text>
                                </HStack>
                                <Spacer/>
                                {
                                    userId === blog.author._id ?
                                    <HStack>
                                        <Link onClick={() => updateBlog()}>Update</Link>
                                        <Link onClick={() => deleteBlog()}>Delete</Link>
                                    </HStack>
                                    :
                                    null
                                }
                            </Flex>
                            <Box p='10px' bg='#f2f2f2' borderRadius='10px' w='100%'>
                                <div dangerouslySetInnerHTML={{ __html: blog.body}} />
                            </Box>
                        </VStack>
                        <Box w='100%'>
                            <Text fontSize='17px'>
                                Comments
                            </Text>
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
                                                <Flex w='100%' direction='row' marginBottom='10px'>
                                                    <HStack>
                                                        <Text fontWeight='500'>
                                                            {i.author.username},
                                                        </Text>
                                                        <Text fontWeight='500'>
                                                            {convertDateTime(i.date)}
                                                        </Text>
                                                    </HStack>
                                                    <Spacer/>
                                                    <HStack>
                                                        {
                                                            userId === i.author._id  ?
                                                            <Link onClick={() => updateComment(i)}>Update</Link>
                                                            :
                                                            null
                                                        }
                                                        {
                                                            userId === blog.author._id || userId === i.author._id  ?
                                                            <Link onClick={() => deleteComment(i._id)}>Delete</Link>
                                                            :
                                                            null
                                                        }
                                                    </HStack>
                                                </Flex>
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
                                <Button onClick={postComment} isDisabled={comment.length === 0}>
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