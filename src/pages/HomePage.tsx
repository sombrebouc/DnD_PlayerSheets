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
    <IonPage>
      {/* Le header utilise des classes pour le rendre plus distinctif */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Mes Personnages
          </IonTitle>
          <IonButton 
            slot="end" 
            fill="clear" 
            onClick={handleAddCharacter}
          >
            <IonIcon icon={add} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      {/* Le contenu principal avec padding et espacement */}
      <IonContent >
        {characters.length > 0 ? (
          <IonList >
            {characters.map((character) => (
              <IonItemSliding key={character.id}>
                {/* Chaque carte de personnage avec des effets de survol et ombres */}
                <IonItem >
                  <IonAvatar slot="start" >
                    <IonIcon 
                      icon={person} 
                      className="w-8 h-8"
                    />
                  </IonAvatar>
                  
                  {/* Information du personnage avec typographie stylisée */}
                  <IonLabel >
                    <h2>
                      {character.name}
                    </h2>
                    <p>
                      {character.race} {character.class} - Niveau {character.level}
                    </p>
                  </IonLabel>
                  
                  {/* Bouton de paramètres avec effet de survol */}
                  <IonButton 
                    fill="clear" 
                    slot="end"
                    onClick={() => history.push(`/character/${character.id}`)}
                  >
                    <IonIcon icon={settings} />
                  </IonButton>
                </IonItem>

                {/* Options de glissement avec effet de survol */}
                <IonItemOptions side="end">
                  <IonItemOption 
                    color="danger" 
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
          <div>

          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;