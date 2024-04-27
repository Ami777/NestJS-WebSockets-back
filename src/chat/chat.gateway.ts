import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, {
  cors: true,
  namespace: 'chat',
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('chat-msg')
  handleChatMsg(
    @MessageBody() msg: string,
  ) {
    console.log('Wiadomość!', msg);

    this.server.send('new-msg', msg);
  }
}
