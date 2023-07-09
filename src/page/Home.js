import { Nav } from "../components/Nav"  
import { Wrap, WrapItem, Flex, Heading, Text } from "@chakra-ui/react"

export const Home = () => {
    return(
        <>
            <Nav/>
            <Wrap p='50px' justify='center'>
                <WrapItem>
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
                            Alien Trick
                        </Heading>
                        <Text>
                            wyhong3103
                        </Text>
                    </Flex>
                </WrapItem>
            </Wrap>
        </>
    )
}
