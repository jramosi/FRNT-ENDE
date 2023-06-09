/**Metodos para facilitar el uso de react-query*/
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * Metodo para obtener LISTADO de registros de datos
 * @param string key 
 * @param function methodService 
 * @param function methodService 
 * @param json config
 * @returns 
 */
export function useData(key = '', methodService, config = {}) {
  return useQuery([key], methodService, config);
}
/**
 * Metodo para CREAR ,EDITAR O ELIMINAR registros de datos
 * @param string key 
 * @param function methodService 
 * @returns 
 */
export function useDataMutate(key, methodService) {
  const queryClient = useQueryClient();

  return useMutation(methodService, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([key]);
    },
  });
}