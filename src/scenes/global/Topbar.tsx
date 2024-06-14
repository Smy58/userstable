import { Box, IconButton, useTheme } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext, tokens } from "../../theme"
import InputBase from "@mui/material/InputBase"
import {
	LightModeOutlined,
	DarkModeOutlined,
	NotificationsOutlined,
	SettingsOutlined,
	PersonOutlined,
	Search
} from "@mui/icons-material"

const Topbar = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const colorMode = useContext(ColorModeContext)

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			<Box >
				
			</Box>
			
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlined />
					) : (
						<LightModeOutlined />
					)}
				</IconButton>
				
				
			</Box>
		</Box>
	)
}

export default Topbar