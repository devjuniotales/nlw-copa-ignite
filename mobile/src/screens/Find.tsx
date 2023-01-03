import { Heading, Stack, VStack , useToast } from "native-base";
import { useState} from 'react'


import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
    const [ isLoading , setIsLoading ] = useState(false)
    const  { navigate } = useNavigation() 
    const [ code , setCode ] = useState('')
    const toast = useToast()

    async function handleJoinPool() {
        try {
            setIsLoading(true)

            if(!code.trim()){
                return toast.show({
                    title : 'Informe nome para o seu bolão',
                    placement : 'top',
                    bgColor : 'red.500'
               })
            }

            await api.post('/pools/join', { code } )

            toast.show({
                title : 'Você entrou no bolão com sucesso!',
                placement : 'top',
                bgColor : 'green.500'
           })


            navigate('pools')
            
            
        } catch (error) {
            console.log(false)

            if(error.response?.data?.message === 'Pool not found.'){
               
               return toast.show({
                    title : 'bolão não encontrado',
                    placement : 'top',
                    bgColor : 'red.500'
               })
            }
            if(error.response?.data?.message === 'You are already a join this pool.'){
               
               return toast.show({
                    title : 'Você já esta nesse bolão.',
                    placement : 'top',
                    bgColor : 'red.500'
               })
            }

            toast.show({
                title : 'Não foi possivel encontrar o bolão',
                placement : 'top',
                bgColor : 'red.500'
           })

        }
    }
    return(
        <Stack flex = {1} bgColor ='gray.900'>
            <Header
                title="Buscar por código " showBackButton
            />

            <VStack mt ={8} mx ={5} alignItems = 'center' >


                <Heading fontFamily='heading' color ='white' fontSize='xl' mb ={8} textAlign = 'center'>
                    Emcontrar bolâo através de {'\n'}
                    seu código único  
                </Heading>

                <Input 
                    mb={2}
                    placeholder = 'qual código do  bolâo?'
                    onChangeText={setCode}
                    autoCapitalize = 'characters'
                />

                <Button
                    title="BUSCAR  BOLÂO"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />

            </VStack>
        </Stack>
    )
}