import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const Cadastro = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.post(`/users`, {
                email: formData.email,
                senha: formData.senha
            });
            
            if (data.length && data[0].id) {
                navigate('/feed');
                return;
            }

            alert('Usuário ou senha inválido');
        } catch (e) {
            alert('Ocorreu um erro no servidor, tente novamente mais tarde');
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>
                        A plataforma para você aprender com experts, dominar as principais tecnologias
                        e entrar mais rápido nas empresas mais desejadas.
                    </Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Comece agora</TitleLogin>
                        <SubtitleLogin>Crie sua conta e make the change.</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome Completo" leftIcon={<MdPerson color="#A45DBA"/>} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input placeholder="E-mail" leftIcon={<MdEmail color="#A45DBA"/>} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock color="#A45DBA"/>} name="senha" control={control} />
                            {errors.senha && <span>Senha é obrigatório</span>}
                            <Button title="Entrar" variant="secondary" type="submit" />
                        </form>
                        <Row>
                        <SubtitleLogin>Ao clicar em "criar minha conta grátis
                            declator que aceito as Políticas de
                            Privacidade e os Termos de Uso da DIO.
                        </SubtitleLogin>
                        </Row>
                        <Row>
                            <EsqueciText>Ja tenho conta.</EsqueciText>
                            <CriarText>Fazer Login</CriarText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
}

export { Cadastro };
