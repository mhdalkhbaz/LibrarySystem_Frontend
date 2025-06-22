import React from 'react';
import { Modal, Fade, Box, Typography, IconButton, Button } from '@mui/material';
import { Close as CloseIcon, MenuBook as BorrowIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '450px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(3.5),
  borderRadius: '12px',
  border: 'none',
  outline: 'none',
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    padding: theme.spacing(2.5),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: '10px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '0.9375rem',
  textTransform: 'none',
  transition: 'all 0.2s ease',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    transform: 'translateY(-1px)'
  },
}));

const ConfirmationModal = ({ 
  open, 
  onClose, 
  book, 
  userId, 
  onConfirm, 
  isLoading 
}) => {
  if (!book) return null;

  const actionType = userId === book.userId ? 'Return' : 'Borrow';
  const isBorrow = actionType === 'Borrow';

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      closeAfterTransition
      sx={{ backdropFilter: 'blur(3px)' }}
    >
      <Fade in={open}>
        <StyledModal>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            mb: 3 
          }}>
            <Typography variant="h5" component="h2" fontWeight="700" color="text.primary">
              <Box component="span" sx={{ color: isBorrow ? 'primary.main' : 'secondary.main' }}>
                {actionType} 
              </Box> Confirmation
            </Typography>
            <IconButton 
              onClick={onClose}
              size="small"
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'text.primary'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ 
            mb: 4, 
            fontSize: '1.025rem',
            lineHeight: 1.6,
            color: 'text.secondary'
          }}>
            Are you sure you want to {actionType.toLowerCase()} the book 
            <Box component="span" sx={{ 
              color: 'text.primary', 
              fontWeight: 600,
              mx: 0.5
            }}>
              "{book.title}"
            </Box> 
            by 
            <Box component="span" sx={{ 
              color: 'text.primary', 
              fontWeight: 500,
              ml: 0.5
            }}>
              {book.author}?
            </Box>
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 2,
            pt: 1
          }}>
            <ActionButton
              variant="outlined"
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'text.primary',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Cancel
            </ActionButton>
            <ActionButton
              variant="contained"
              color={isBorrow ? 'primary' : 'secondary'}
              onClick={() => onConfirm(isBorrow)}
              startIcon={<BorrowIcon sx={{ fontSize: '1.1rem' }} />}
              disabled={isLoading}
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: 'action.disabledBackground',
                  color: 'text.disabled'
                }
              }}
            >
              {isLoading ? 'Processing...' : actionType}
            </ActionButton>
          </Box>
        </StyledModal>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;