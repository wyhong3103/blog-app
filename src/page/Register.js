import { Nav } from "../components/Nav"
import { Heading, Flex, VStack, Input, InputGroup, InputRightElement, Button, FormControl, FormLabel } from '@chakra-ui/react'
import { useState } from "react"

export const Register  = () => {
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    return(
        <>
            <Nav/> 
            <Flex direction='column' justify='center' align='center' gap='20px'>
                <Heading fontSize='25px'>
                    Register
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
                        <Button>
                            Register
                        </Button>
                    </VStack>
                </FormControl>
            </Flex>
        </>
    )
}
