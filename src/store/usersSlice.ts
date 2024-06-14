import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit"

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async function (_, {rejectWithValue}) {

		const response = await fetch('http://localhost:3001/users')

		if (!response.ok) {
			return rejectWithValue('Server Error!')
		}

		const data = await response.json()

		return data
		
	}
)

export const removeUser = createAsyncThunk<string, string, { rejectValue: string }>(
	'users/removeUser',
	async function (id, {rejectWithValue}) {
		const response = await fetch(`http://localhost:3001/users/${id}`,{
			method: 'DELETE'
		})

		if (!response.ok) {
			return rejectWithValue('Can\'t delete user')
		}

		return id

	}
)

export const addUser = createAsyncThunk<User, object, {rejectValue: string}>(
	'users/addUser',
	async function (newUser, {rejectWithValue}) {
		const response = await fetch(`http://localhost:3001/users`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		})

		if (!response.ok) {
			return rejectWithValue('Can\'t add user')
		}

		return (await response.json()) as User
	}
)

export const updateUser = createAsyncThunk<User, {id: string, value: object}, {rejectValue: string}>(
	'users/updateUser',
	async function ({id, value}, {rejectWithValue}) {
		const response = await fetch(`http://localhost:3001/users/${id}`,{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(value)
		})

		if (!response.ok) {
			return rejectWithValue('Can\'t update user')
		}

		return (await response.json()) as User
	}

)

type skillType = {
	id: number,
	name: string
}

type User = {
	id: string,
	firstName: string,
	lastName: string,
	email: string,
	skills: Array<skillType>
}

type UsersState = {
	list: User[];
	loading: boolean;
	error: string | null;
}

const initialState: UsersState = {
	list: [],
	loading: false,
	error: null
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false
				state.list = action.payload
			})
			.addCase(addUser.fulfilled, (state, action) => {
				state.list.push({
					id: action.payload.id,
					firstName: action.payload.firstName,
					lastName: action.payload.lastName,
					email: action.payload.email,
					skills: action.payload.skills,
				})
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				const user = action.payload
				state.list.find(item => {
					if (item.id === user.id) {
						item.firstName = user.firstName
						item.lastName = user.lastName
						item.email = user.email
						item.skills = user.skills
					}
				})
			})
			.addCase(removeUser.fulfilled, (state, action) => {
				state.list = state.list.filter(item => item.id !== action.payload)

			})
			.addMatcher(isError, (state, action: PayloadAction<string>) => {
				state.error = action.payload
				state.loading = false
			})
	}
})

function isError(action: AnyAction) {
	return action.type.endsWith('rejected');
}


export default usersSlice.reducer