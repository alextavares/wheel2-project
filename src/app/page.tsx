import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirecionar para a versão em português por padrão
  redirect('/pt');
}
