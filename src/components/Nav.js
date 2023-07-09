import { Flex, Spacer, VStack, HStack, Box, Heading, Link } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const Nav = () => {
    const [logged, setLogged] = useState(false);
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;

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
                        setLogged(true);
                    }else{
                        Cookies.remove('accessToken');
                    }
                }
            })();
        }
    ,[])

    return(
        <VStack spacing='20px' p='20px'>
            <Heading size='lg'>
                Blog
            </Heading>
            <Flex direction='row' w='70%' minW='300px'>
                <HStack spacing='30px'>
                    <Box>
                        <Link href='/'>Home</Link>
                    </Box>
                    {
                        logged ? 
                        <Box>
                            <Link href='/create'>Create</Link>
                        </Box>
                        :
                        null
                    }
                </HStack>
                <Spacer/>
                <HStack spacing='30px'>
                    {
                        logged ? 
                        <Box>
                            <Link href='/logout'>Log Out</Link>
                        </Box>
                        :
                        <>
                            <Box>
                                <Link href='/login'>Login</Link>
                            </Box>
                            <Box>
                                <Link href='/register'>Register</Link>
                            </Box>
                        </>
                    }
                </HStack>
            </Flex>
        </VStack>
    )
}