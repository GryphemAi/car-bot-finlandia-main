'use client';
import { authenticateSignIn, handleSignIn } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Mail, Lock } from 'lucide-react';
import { logUserActivity } from '@/services/activity-logs';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const formSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  password: z.string().min(1, { message: 'Digite sua senha' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function SignInAuthForm() {
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function ensureUserProfile(email: string) {
    console.log('Verificando perfil de usuário para:', email);
    const userDocRef = doc(db, 'users', email);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      console.log('Tentando criar perfil de usuário para:', email);
      await setDoc(userDocRef, {
        email,
        createdAt: new Date(),
        // Adicione outros campos necessários aqui
      });
      console.log('Perfil de usuário criado:', email);
    } else {
      console.log('Perfil de usuário já existe:', email);
    }
  }

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      const res = await authenticateSignIn(data.email, data.password);
      if (res?.error) {
        toast.error('Verifique suas credenciais!');
        return;
      } else {
        await handleSignIn();
        await ensureUserProfile(data.email);
        await logUserActivity({
          userId: data.email,
          action: 'login',
          timestamp: new Date(),
          location: { ip: 'user_ip' }, // Substitua 'user_ip' pelo IP real
          userAgent: navigator.userAgent,
        });
      }
      toast.success('Logado com sucesso!');
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Digite seu email..."
                    className="pl-10 h-11"
                    disabled={loading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Digite sua senha..."
                    className="pl-10 h-11"
                    disabled={loading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          disabled={loading} 
          className="w-full h-11 text-base font-medium shadow-sm hover:shadow-md transition-all" 
          type="submit"
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
