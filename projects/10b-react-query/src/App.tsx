import { useMemo, useState } from 'react'
import { useUsers } from './hooks/useUsers'
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'
import './App.css'
import { Results } from './components/Results'

function App () {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => { }

  const handleReset = async () => {
    await refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(prevSort => (sort === prevSort ? SortBy.NONE : sort))
  }

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country
          .toLocaleLowerCase()
          .includes(filterCountry.toLocaleLowerCase())
      })
      : users
  }, [filterCountry, users])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <Results />
      <header>
        <button onClick={toggleColors}>Colorear filas</button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por país'
            : 'Ordenar por país'}
        </button>

        <button onClick={() => handleReset}>Resetear estado</button>

        <input
          placeholder='Filtra por país'
          onChange={e => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        {users.length > 0 &&
        (<UsersList
          showColors={showColors}
          users={sortedUsers}
          deleteUser={handleDelete}
          changeSorting={handleChangeSort}
         />)}

        {isLoading && <strong>Cargando...</strong>}

        {isError && <p>Ha habido un error</p>}

        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && users.length > 0 && (hasNextPage === true) && (
          <button onClick={() => { void fetchNextPage() }}>Cargar más resultados</button>
        )}

        {!isLoading && !isError && users.length > 0 && (hasNextPage === undefined) && (<p>No hay más resultados</p>)}
      </main>
    </div>
  )
}

export default App
