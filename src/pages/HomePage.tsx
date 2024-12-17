import Character from "../datas/characters/CharactersType";
import { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAvatar,
  useIonToast
} from '@ionic/react';
import { add, person, settings, trash } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const history = useHistory();
  const [presentToast] = useIonToast();

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const response = await fetch('/src/datas/characters/Characters.json');
      const data = await response.json();
      setCharacters(data.characters);
    } catch (error) {
      presentToast({
        message: 'Erreur lors du chargement des personnages',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const saveCharacters = async (updatedCharacters: Character[]) => {
    try {
      setCharacters(updatedCharacters);
    } catch (error) {
      presentToast({
        message: 'Erreur lors de la sauvegarde',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const handleAddCharacter = () => {
    history.push('/character/new');
  };

  const handleDeleteCharacter = async (id: number) => {
    const updatedCharacters = characters.filter(character => character.id !== id);
    await saveCharacters(updatedCharacters);
    
    presentToast({
      message: 'Personnage supprimé avec succès',
      duration: 2000,
      color: 'success'
    });
  };

  return (
    // La classe bg-gray-100 applique un fond gris clair à toute la page
    <IonPage className="bg-zinc-700">
      {/* Le header utilise des classes pour le rendre plus distinctif */}
      <IonHeader className="shadow-md">
        <IonToolbar className="px-4">
          <IonTitle className="text-2xl bg-zinc-700 font-extrabold text-gray-100">
            Mes Personnages
          </IonTitle>
          <IonButton 
            slot="end" 
            fill="clear" 
            className="hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={handleAddCharacter}
          >
            <IonIcon icon={add} className="text-green-500 w-6 h-6" />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      {/* Le contenu principal avec padding et espacement */}
      <IonContent className="px-4 py-6">
        {characters.length > 0 ? (
          <IonList className="bg-transparent">
            {characters.map((character) => (
              <IonItemSliding key={character.id}>
                {/* Chaque carte de personnage avec des effets de survol et ombres */}
                <IonItem className="my-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden">
                  <IonAvatar slot="start" className="bg-gray-100 p-2">
                    <IonIcon 
                      icon={person} 
                      className="w-8 h-8 text-gray-600"
                    />
                  </IonAvatar>
                  
                  {/* Information du personnage avec typographie stylisée */}
                  <IonLabel className="py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {character.name}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {character.race} {character.class} - Niveau {character.level}
                    </p>
                  </IonLabel>
                  
                  {/* Bouton de paramètres avec effet de survol */}
                  <IonButton 
                    fill="clear" 
                    slot="end"
                    className="hover:bg-blue-50 rounded-full transition-colors duration-200"
                    onClick={() => history.push(`/character/${character.id}`)}
                  >
                    <IonIcon icon={settings} className="text-blue-500 w-5 h-5" />
                  </IonButton>
                </IonItem>

                {/* Options de glissement avec effet de survol */}
                <IonItemOptions side="end">
                  <IonItemOption 
                    color="danger" 
                    className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
                    onClick={() => handleDeleteCharacter(character.id)}
                  >
                    <IonIcon slot="icon-only" icon={trash} className="w-5 h-5" />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        ) : (
          // État vide stylisé
          <div className="flex flex-col items-center justify-center h-full text-center px-4">

          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;