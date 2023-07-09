import { Nav } from "../components/Nav"
import { useNavigate } from "react-router-dom"
import { Heading, Flex, VStack, Input, InputGroup, InputRightElement, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export const Register  = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_BLOG_API_URL;

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value);
    }

    const register = async () => {
        const res = await fetch(apiUrl + '/register',
        {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({username, password, repassword})
        });
        const data = await res.json();
        if (data.status){
            navigate('/');
        }else{
            setError([...data.err]);
        }
    }

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
                        navigate('/');
                    }else{
                        Cookies.remove('accessToken');
                    }
                }
            })();
        }
    ,[])

    return(
        <>
            <Nav/> 
            <Flex direction='column' justify='center' align='center' gap='20px'>
                <Heading fontSize='25px'>
                    Register
                </Heading>
                <FormControl w='500px' isInvalid={error.length > 0}>
                    <VStack gap='40px'>
                        <Flex direction='column' gap='10px' w='100%'>
                            <FormLabel>Username</FormLabel>
                            <Input value={username} onChange={handleUsernameChange} variant='outline' placeholder='Username' id='username'/>
                        </Flex>
                        <Flex direction='column' gap='10px' w='100%'>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                            <Input
                                value={password}
                                onChange={handlePasswordChange}
                                pr='4.5rem'
                                type={show1 ? 'text' : 'password'}
                                placeholder='Enter password'
                                id='password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow1(!show1)}>
                                {show1 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                            </InputGroup>
                        </Flex>
                        <Flex direction='column' gap='10px' w='100%'>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup size='md'>
                            <Input
                                value={repassword}
                                onChange={handleRePasswordChange}
                                pr='4.5rem'
                                type={show2 ? 'text' : 'password'}
                                placeholder='Enter password'
                                id='password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setShow2(!show2)}>
                                {show2 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                            </InputGroup>
                        </Flex>
                        {
                            error.length > 0 ? 
                            error.map(
                                i => <FormErrorMessage>{i}</FormErrorMessage>
                            )
                            :
                            null
                        }
                        <Button onClick={register}>
                            Register
                        </Button>
                    </VStack>
                </FormControl>
            </Flex>
        </>
    )
}
