import { useState , useCallback } from 'react'
import { VStack , Icon} from "native-base";
import { useNavigation , useFocusEffect } from '@react-navigation/native'
import { useToast, FlatList } from 'native-base';

import { api } from "../services/api";

import { Octicons } from '@expo/vector-icons'
import {PoolCard, PoolCardPros } from '../components/PoolCard'

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from '../components/Loading'
import { EmptyPoolList } from '../components/EmptyPoolList';

export function Pools() {
    const { navigate } = useNavigation()
    const toast = useToast()

    const [ isLoading , setIsLoading] = useState(true)
    const [ pools, setPools ] = useState<PoolCardPros[]>([])

    async function fetchPool() {
        try {
            setIsLoading(true)
           const response = await api.get('/pools')


           setPools(response.data.pools)

        } catch (error) {
            console.log(error)

            return toast.show({
                title : 'Não foi possivel carregar os bolões',
                placement : 'top',
                bgColor : 'red.500'
           })

        }finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPool();
    },[]))

    return(
        <VStack flex = {1} bgColor = 'gray.900'>
            <Header title="Meus bolôes" />

            <VStack mt={6} my={5} borderBottomWidth ={1} borderBottomColor='gray.600' pb={4} mb={4}>
              
                <Button title="BUSCAR BOLÂO POR CÓDIGO"
                 leftIcon={<Icon  as={Octicons} name='search' color='black' size='md'/>}
                 onPress = {() => navigate('find')}
                />

            </VStack>

            {
            isLoading ? <Loading/> :
             <FlatList 
                data={pools}
                keyExtractor ={item => item.id}
                renderItem = {({item}) => (
                    <PoolCard 
                    data={item} 
                    onPress ={() => navigate('details', { id : item.id})}
                    /> 
                )} 
                showsVerticalScrollIndicator ={false}
                ListEmptyComponent ={() => <EmptyPoolList/>}
                _contentContainerStyle = {{pb : 10}}
                px ={5}
            />
            }
        </VStack>
    )
}