import * as React from 'react';
import { Box, Typography, Avatar, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Home, Inventory, People, RequestPage } from '@mui/icons-material';

interface ListItemLinkProps {
	icon?: React.ReactElement;
	primary: string;
	check?: boolean;
}

function ListItemLink(props: ListItemLinkProps) {
	const { icon, primary, check } = props;
	return (
					<ListItemButton selected={check} sx={{
							marginTop: 1,
							marginBottom: 1,
							marginLeft: 0.5,
							marginRight: 0.5,
							borderRadius: 4
					}}>
							{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
							<ListItemText primary={primary} />
					</ListItemButton>
	);
}

export default function NavigationBar ()
{
  return (
		<Box width="20%" bgcolor="white" p={2} boxShadow={1}>
			<Typography variant="h6" fontWeight="bold">Appname</Typography>
			<Box mt={4} display="flex" alignItems="center">
				<Avatar src="https://via.placeholder.com/40" />
				<Box ml={2}>
					<Typography fontWeight="bold">Nguyen Van B</Typography>
					<Typography variant="body2" color="textSecondary">Admin</Typography>
				</Box>
			</Box>
			<List>
				<ListItemLink primary="Trang chủ" icon={<Home />} />
				<ListItemLink check primary="Sản phẩm" icon={<Inventory />} />
				<ListItemLink primary="Khách hàng" icon={<People />} />
				<ListItemLink primary="Đơn hàng" icon={<RequestPage />}/>
			</List>
		</Box>
	)
}