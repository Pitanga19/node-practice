// node-practice/index.ts

import { server } from './src/app';

const PORT: number = parseInt(process.env.PORT || '3000', 10);

server.listen(PORT, '0.0.0.0', (): void => {
    console.log(`[index.ts]: Server is running on http://0.0.0.0:${PORT}`);
});