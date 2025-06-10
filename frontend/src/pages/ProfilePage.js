import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        rua: initialData?.rua || '',
        bairro: initialData?.bairro || '',
        cidade: initialData?.cidade || '',
        uf: initialData?.uf || '',
        cep: initialData?.cep || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        const dataToSend = { ...formData, usuario_id: storedUser.id };
        onSave(dataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="address-form">
            <div className="form-row">
                <div className="form-group-inline">
                    <label>CEP</label>
                    <input type="text" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" />
                </div>
                <div className="form-group-inline">
                    <label>Rua / Logradouro</label>
                    <input type="text" name="rua" value={formData.rua} onChange={handleChange} placeholder="Ex: Rua das Flores, 123" />
                </div>
            </div>
             <div className="form-row">
                <div className="form-group-inline">
                    <label>Bairro</label>
                    <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Centro" />
                </div>
                <div className="form-group-inline">
                    <label>Cidade</label>
                    <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="São Paulo" />
                </div>
                <div className="form-group-inline" style={{flexBasis: '100px'}}>
                    <label>UF</label>
                    <input type="text" name="uf" value={formData.uf} onChange={handleChange} placeholder="SP" maxLength="2" />
                </div>
            </div>
            <div className="form-actions">
                <button type="button" onClick={onCancel} className="button-secondary">Cancelar</button>
                <button type="submit">Salvar Endereço</button>
            </div>
        </form>
    );
};


function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const fetchProfile = () => {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser) {
            setLoading(true);
            axios.get(`http://localhost:3001/perfil/${storedUser.id}`)
                .then(res => {
                    setProfile(res.data);
                    if (!res.data.endereco) {
                        setIsEditingAddress(true);
                    }
                })
                .catch(err => console.error("Erro ao buscar perfil", err))
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSaveAddress = (addressData) => {
        axios.post('http://localhost:3001/perfil/endereco', addressData)
            .then(() => {
                alert('Endereço salvo com sucesso!');
                setIsEditingAddress(false);
                fetchProfile(); 
            })
            .catch(err => alert('Erro ao salvar endereço.'));
    };

    if (loading) return <div className="container-wide"><p>Carregando perfil...</p></div>;
    if (!profile) return <div className="container-wide"><p>Não foi possível carregar o perfil.</p></div>;

    return (
        <div className="container-wide">
            <h2>Meu Perfil</h2>
            <div className="profile-section">
                <h3>Dados Pessoais</h3>
                <p><strong>Nome:</strong> {profile.usuario.nome}</p>
                <p><strong>Email:</strong> {profile.usuario.email}</p>
            </div>

            <div className="profile-section">
                <h3>Meu Endereço de Entrega</h3>
                {isEditingAddress ? (
                    <AddressForm 
                        initialData={profile.endereco} 
                        onSave={handleSaveAddress}
                        onCancel={() => profile.endereco && setIsEditingAddress(false)} 
                    />
                ) : (
                    <>
                        <p>{profile.endereco.rua}, {profile.endereco.bairro}</p>
                        <p>{profile.endereco.cidade} - {profile.endereco.uf}, CEP: {profile.endereco.cep}</p>
                        <button onClick={() => setIsEditingAddress(true)} style={{width: 'auto', marginTop: '1rem'}}>Editar Endereço</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
