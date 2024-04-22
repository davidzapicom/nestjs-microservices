import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../schemas/user.schema';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): UserDocument => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
