import React from 'react';
import {
  Modal,
  Fade,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const LoginModal = ({
  open,
  username,
  onUsernameChange,
  onSubmit,
  isLoading,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 380,
            bgcolor: 'background.default',
            boxShadow: 6,
            borderRadius: 3,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              p: 1.5,
              mb: 1,
            }}
          >
            <PersonIcon fontSize="large" />
          </Box>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={onUsernameChange}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={onSubmit}
            disabled={!username.trim() || isLoading}
            sx={{ mt: 1 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
