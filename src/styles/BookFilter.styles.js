import { styled } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: '30px !important',
  padding: '8px 20px',
  border: '1px solid #ddd !important',
  margin: '0 5px',
  fontWeight: 'bold',
  width: '150px',
  fontSize: '12px',
  transition: 'all 0.3s ease',
  '&.Mui-selected': {
    background: `${theme.palette.primary.main} !important`,
    color: '#fff !important',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    border: `1px solid ${theme.palette.primary.main} !important`
  },
  '&:hover': {
    background: '#f5f5f5'
  }
}));

export const StyledToggleGroup = styled(ToggleButtonGroup)({
  '.MuiToggleButtonGroup-grouped': {
    borderRadius: '30px !important'
  }
});