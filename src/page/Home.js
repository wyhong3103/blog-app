import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Nav } from "../components/Nav"  
import { Wrap, WrapItem, Flex, Heading, Text } from "@chakra-ui/react"

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
            <Wrap p='50px' justify='center'>
                {
                    blogs.length > 0 ?

                    blogs.map(
                        (i) => {
                            return(
                                <WrapItem onClick={() => toBlog(i._id)}>
                                    <Flex 
                                        transition='background-color 0.2s' 
                                        w='300px' 
                                        h='150px' 
                                        direction='column' 
                                        justify='center' 
                                        align='center' 
                                        borderRadius='10px'
                                        _hover={{bg : '#e5e5e5', cursor : 'pointer'}}
                                    >
                                        <Heading size='md'>
                                        {i.title}
                                        </Heading>
                                        <Text>
                                        {i.author.username}
                                        </Text>
                                    </Flex>
                                </WrapItem>
                            )
                        }
                    )
                    :
                    <Text>
                        No blogs
                    </Text>
                }
            </Wrap>
        </>
    )
}
