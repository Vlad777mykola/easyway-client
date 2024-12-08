import { router } from '@/components/router/Router';
import { client } from '@/constants/apollo-client';
import { authenticatedVar } from '@/constants/authenticated';

export const logout = () =>{
    authenticatedVar(false);
    router.navigate("/login");
    client.resetStore();
}