import { Nav } from "../components/Nav"
import { Heading, Flex, VStack, Input, InputGroup, InputRightElement, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from "react"

export const Login = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return(
        <>
            <Nav/> 
            <Flex direction='column' justify='center' align='center' gap='20px'>
                <Heading fontSize='25px'>
                    Login
                </Heading>
                <FormControl w='500px'>
                    <VStack gap='40px'>
                        <Flex direction='column' gap='10px' w='100%'>
                            <FormLabel>Username</FormLabel>
                            <Input variant='outline' placeholder='Username' id='username'/>
                        </Flex>
                        <Flex direction='column' gap='10px' w='100%'>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                id='password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                            </InputGroup>
                        </Flex>
                        <Button>
                            Login
                        </Button>
                    </VStack>
                </FormControl>
            </Flex>
        </>
    )
}
