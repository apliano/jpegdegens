import { deployHello } from './deploy-hello';
import { deployCounter } from './deploy-counter';
import { deployFallback } from './deploy-fallback';
import { fallback } from './deploy-a';

deployCounter();
deployHello();
//deployFallback();
fallback();
