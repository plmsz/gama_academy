- Data Fetching

  - Axios
  - SWR
  - React Query
  - GraphQL - uRQL - Apollo Client - Relay

SWR primeiro retorna os dados vindos do cache (stale), então reenvia a requisição de busca (revalidate), e finalmente vem com os dados atualizados novamente.

Nesse exemplo, o hook useSWR aceita uma string key e uma função fetcher. key é um identificador único do dado (normalmente a URL da API) e será passado para fetcher.
fetcher pode ser qualquer função assíncrona que retorna o dado, você pode usar o fetch nativo ou ferramentas como Axios.
O hook retorna 2 valores: data e error, baseado no status da solicitação.
