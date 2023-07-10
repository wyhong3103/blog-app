import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Nav } from "../components/Nav"  
import { Flex, Spacer, Heading, Text, VStack, Box, Center } from "@chakra-ui/react"

export const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;

    const toBlog = (id) => {
        navigate(`/blog/${id}`);
    }

    useEffect(
        () => {
            (async()=>{
                const res = await fetch(apiUrl+'/blog');
                const data = await res.json();
                setBlogs([...data.blogs]);
            })()
        }
    , [])

    return(
        <>
            <Nav/>
            <Center>
                <VStack p='50px' w='100%' maxW='1200px'>
                    {
                        blogs.length > 0 ?
                        <>
                        <Flex
                            w='100%'
                            h='50px'
                            align='center'
                            p='10px'
                            direction='row'
                        >
                            <Text>
                            Title
                            </Text>
                            <Spacer/>
                            <Text>
                            Author
                            </Text>
                        </Flex>
                        {
                            blogs.map(
                                (i) => {
                                    return(
                                        <Box onClick={() => toBlog(i._id)} w='100%'>
                                            <Flex
                                                transition='background-color 0.2s'
                                                w='100%'
                                                h='50px'
                                                align='center'
                                                p='10px'
                                                direction='row'
                                                borderRadius='10px'
                                                _hover={{bg : '#e5e5e5', cursor : 'pointer'}}
                                            >
                                                <Heading size='md'>
                                                {i.title}
                                                </Heading>
                                                <Spacer/>
                                                <Text>
                                                {i.author.username}
                                                </Text>
                                            </Flex>
                                        </Box>
                                    )
                                }
                            )
                        }
                        </>
                        :
                        <Text>
                            No blogs
                        </Text>
                    }
                </VStack>
            </Center>
        </>
    )
}
