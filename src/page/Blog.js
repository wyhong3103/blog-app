import { Nav } from "../components/Nav";
import { Heading, VStack, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [status, setStatus] = useState({ok : 0});
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;

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

    return(
        <>
            {
                status.ok === 1 ? 
            
                <>
                <Nav/>
                <VStack p="20px 50px 20px 50px">
                    <VStack p='20px' gap='20px'>
                        <Heading size='lg'>
                            {blog.title}
                        </Heading>
                        <div dangerouslySetInnerHTML={{ __html: blog.body}} />
                    </VStack>
                        {
                            blog.comments.length > 0
                            ?
                            <>
                                <Box bg='#e5e5e5' p='20px'>
                                    <Heading size="md">
                                        Comments
                                    </Heading>
                                    {
                                        blog.comments.map(
                                            i => {
                                                return(
                                                    <Box>
                                                        <Box>
                                                            <Text>
                                                                {i.author.username}
                                                            </Text>
                                                            <Text>
                                                                {i.date}
                                                            </Text>
                                                        </Box>
                                                        <Text>
                                                            {i.content}
                                                        </Text>
                                                    </Box>
                                                )
                                            }
                                        )
                                    }
                                </Box>
                            </>
                            :
                            null
                        }
                </VStack>

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