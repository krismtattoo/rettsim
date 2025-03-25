import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  styled,
} from '@mui/material';
import {
  Send as SendIcon,
} from '@mui/icons-material';

const Container = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderBottom: '1px solid rgba(79, 195, 247, 0.2)',
  minHeight: '40px',
}));

const Title = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 600,
});

const Content = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column-reverse',
}));

const MessageBubble = styled(Box)<{ isUser: boolean }>(({ isUser, theme }) => ({
  background: isUser
    ? 'linear-gradient(45deg, rgba(25, 118, 210, 0.4), rgba(25, 118, 210, 0.6))'
    : 'linear-gradient(45deg, rgba(19, 47, 76, 0.6), rgba(19, 47, 76, 0.8))',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  maxWidth: '85%',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
}));

const MessageHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '4px',
  fontSize: '0.75rem',
  color: 'rgba(255, 255, 255, 0.7)',
});

const MessageContent = styled(Typography)({
  fontSize: '0.85rem',
  wordBreak: 'break-word',
});

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderTop: '1px solid rgba(79, 195, 247, 0.2)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    background: 'rgba(19, 47, 76, 0.6)',
    borderRadius: theme.spacing(1),
    fontSize: '0.85rem',
    padding: theme.spacing(0.5),
  },
}));

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'voice' | 'radio';
}

interface CommunicationPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const CommunicationPanel: React.FC<CommunicationPanelProps> = ({
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Container>
      <Header>
        <Title>Kommunikation</Title>
      </Header>
      <Content>
        {messages.map((message) => (
          <MessageBubble key={message.id} isUser={message.sender === 'Leitstelle'}>
            <MessageHeader>
              <span>{message.sender}</span>
              <span>{message.timestamp}</span>
            </MessageHeader>
            <MessageContent>{message.content}</MessageContent>
          </MessageBubble>
        ))}
      </Content>
      <InputContainer>
        <StyledTextField
          fullWidth
          size="small"
          placeholder="Nachricht eingeben..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={2}
        />
        <IconButton size="small" onClick={handleSend} disabled={!newMessage.trim()}>
          <SendIcon fontSize="small" />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default CommunicationPanel; 