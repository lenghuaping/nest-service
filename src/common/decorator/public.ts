import { IS_PUBLIC_KEY } from '@/utils/global.constant';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
