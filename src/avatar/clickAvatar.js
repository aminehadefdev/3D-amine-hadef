import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { focusAvatar } from './focusAvatar';
import { displaydialog } from './displaydialog';
import { displayTextOnDialog } from './displayTextOnDialog';
import { displayPopUpQuestions } from './displayPopUpQuestions';
import { displayBtnsQuestions } from './displayBtnsQuestions';
import { addEventbtnsQuestions } from './addEventbtnsQuestions';
import { talk } from './animations/talk';
import { stay } from './animations/stay';
import { salsa } from './animations/salsa'
import { moveCameraToTopView } from './moveCameraToTopView';
import { getAgeFromDate } from './getAgeFromDate';




export function clickAvatar(avatar, camera, controls, renderer, scene, mixer) {
    // --- Raycaster pour le clic ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let counter = 0

    const questions = [
        {
            "question": "Salut, t’es qui toi ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Hey 👋 moi c’est Amine, un hacker du web (version propre hein 😅) passionné par le code, les interfaces bien faites et les défis techniques !", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            'question': 'Tu as quel âge ?',
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talk(avatar, mixer)
                displayTextOnDialog("J’ai " + getAgeFromDate('22/11/1991') + " ans, je suis né le 22/11/1991.\nJe trouve ma date d’anniversaire super stylée : elle est complètement en miroir 😉", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            'question': 'Tu habite ou?',
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talk(avatar, mixer)
                displayTextOnDialog("j'habite a Clamart dans le 92.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Tu viens d’où ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Je viens d’Algérie DZ squad, j'ai grandi en france, j’ai posé mes valises à Paris 🗼. Ici, je code, je crée, et je carbure au thé ☕ et à la musique 🎧.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Pourquoi t’as choisi le développement ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Parce que j’adore apprendre et comprendre comment tout marche ! Et aussi parce que faire planter un programme et réussir à le réparer, c’est un peu comme vaincre un boss de jeu vidéo 💪🎮. le developpement m'offre un vrais defi il y a toujour quelque chose a apprende ou a revoir", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Tu as des préférences sur le secteur de ta future entreprise ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Peu importe le secteur 🚀, tant que l’entreprise a de l'éthique et respecte ses équipes 🙌💡.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "T’es fort en quoi exactement ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Mon terrain de jeu ? Le web, tout simplement 😎. Je manie le PHP 🐘 (avec Symfony et Laravel), le JavaScript ⚡ (et ses acolytes React, React Native, Vue, Node, Express, jQuery), sans oublier le HTML, le CSS, Tailwind, Bootstrap et un peu de templating façon Twing et Phtml 🎨. Côté bases de données, je parle couramment MySQL, PostgreSQL et SQL pur jus 💾.", () => {
                    stay(avatar, mixer)
                    let btNext = document.createElement('button');
                    btNext.textContent = 'suivent->';
                    dialog.appendChild(btNext);
                    btNext.addEventListener('click', () => {
                        window.removeEventListener('click', onClick)
                        talk(avatar, mixer)
                        displayTextOnDialog(" Je bricole aussi avec FastAPI 🐍, j’orchestre le tout dans Docker 🐳, je versionne avec Git et SVN, et je garde mes serveurs bien dressés sur Linux, MacOS ou Windows 💻. Ajoute à ça du TDD, du BDD, un peu de DDD, des principes SOLID, et une touche d’Agile (Scrum & Kanban style) 🚀. Bref, full-stack de la tête aux pieds, mais avec un petit cœur ❤️ qui bat fort pour le backend !", () => {
                            stay(avatar, mixer)
                            window.addEventListener('click', onClick)
                        })
                    })
                })
            }
        },
        // {
        //     "question": "Tu fais aussi du design ?",
        //     "id": "btn-question-" + uuidv4(),
        //     "actions": () => {
        //         talk(avatar, mixer)
        //         displayTextOnDialog("Disons que j’aime que ce soit joli 😁. J’aime soigner l’expérience utilisateur, même si je laisse les vrais artistes du design faire les miracles 🎨.", () => {
        //             stay(avatar, mixer)
        //         })
        //     }
        // },
        {
            "question": "C’est quoi ton super-pouvoir de développeur ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Automatiser tout ce qui bouge 😎. Si je peux éviter de refaire la même tâche deux fois, je la code une bonne fois pour toutes ⚙️.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "T’as déjà bossé où ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Chez Adelios, Hexagon, Carte Blanche Conseil, et talent work agency. Des projets variés, du web, des applis mobile, du React, du PHP du python... bref, j’ai touché un peu à tout 💻✨.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Ton projet préféré ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Une borne pour gérer les flux d’entrée de parkings de bus 🚍 à Paris. J’ai repensé toute la maquette et boum 💥 : 70% d’erreurs en moins. Pas mal non ?", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "T’as déjà cassé un site en prod ? 😅",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Heuu… peut-être 👀 Mais chut, on va dire que c’était pour tester la robustesse du système 🤫. Et ce n’était pas un site dont j’avais la charge, ça explique tout.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Qu’est-ce qui te motive dans ton métier ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Résoudre des problèmes, apprendre sans arrêt et voir des idées devenir réelles. Et aussi le thé, beaucoup de thé ☕.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Tu préfères travailler seul ou en équipe ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Les deux! Seul, je trace comme un ninja 🥷. En équipe, j’apprends, je partage, et je rigole (parfois trop 😄).", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Tu veux aller où maintenant ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Rejoindre une équipe qui innove, où je peux grandir techniquement et humainement. Et si y’a des challenges, j’arrive direct 💪.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Si tu n’étais pas développeur ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Quand j’étais petit, je rêvais d’être éboueur 🚛✨, j’adorais leurs énormes camions qui faisaient vroum vroum partout 😎💨. Mais le code m’a vite appâté 💻🔥😄", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Ton langage préféré ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Pas de jaloux entre les langages… sauf peut-être le PHP 🐘, mon premier amour de codeur 💘 — c’est lui qui m’a appris à parler « ordinateur » !", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            'question': "Tu as fait ce site avec quelles technologies ?",
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talk(avatar, mixer)
                displayTextOnDialog("J’ai créé ce site avec Three.js, Vite, Blender et Mixamo. Le gros challenge avec ce projet a été d’apprendre la 3D. Je ne dirais pas que je suis spécialiste, mais j’ai maintenant de bonnes bases.", () => {
                    stay(avatar, mixer)
                })

            }
        },
        {
            "question": "Tu codes la nuit ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Disons que mes meilleures idées arrivent souvent à 2h du matin 🌙💡.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Si ton code était un plat ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Un couscous bien structuré : chaque ingrédient à sa place, un peu épicé, et toujours du fait maison 🍲😋.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Tu préfères les tabs ou les espaces ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Ah, la question qui fâche 😏… Tabs, évidemment. Les espaces, c’est pour les poètes.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Tu t’y connais en intelligence artificielle ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Pas expert, mais je discute souvent avec ChatGPT. Il me pique parfois mes blagues 😅.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            "question": "Et ton motto ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talk(avatar, mixer)
                displayTextOnDialog("Automatise tout ce que tu peux, et fais le reste avec style 😎.", () => {
                    stay(avatar, mixer)
                })
            }
        },
        {
            'question': "Tu sais danser la salsa ?",
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talk(avatar, mixer)
                displayTextOnDialog("En vrai, non… mais ici je sais danser. Vous voulez une démo ?", () => {
                    stay(avatar, mixer)
                    let yesBtn = document.createElement('button');
                    yesBtn.textContent = 'oui';
                    dialog.appendChild(yesBtn);

                    let noBtn = document.createElement('button');
                    noBtn.textContent = 'non';
                    dialog.appendChild(noBtn);

                    noBtn.addEventListener('click', () => {
                        displayTextOnDialog("Une prochaine fois alors 😉")
                    })

                    yesBtn.addEventListener('click', () => {
                        window.removeEventListener('click', onClick)
                        displayTextOnDialog("3 4 tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............")
                        moveCameraToTopView(avatar, camera, controls, renderer, scene, () => {
                            salsa(avatar, mixer, () => {
                                stay(avatar, mixer)
                                focusAvatar(avatar, camera, controls, renderer, scene, () => {
                                    displayTextOnDialog("Wahooooo, c’était trop cool !")
                                    window.addEventListener('click', onClick)
                                })
                            })
                        })
                    });
                })
            }
        },
        {
            'question': "tu as des passions?",
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talk(avatar, mixer)
                displayTextOnDialog("oui j'ai beacoup de passion a part l'informatique. je fait du skateboard, j'aime bien faire des lego aussi j'aime cuisine je fait plein de plat super bon je sais très bien faire du guacamol vous voulez ma recette?", () => {
                    stay(avatar, mixer)
                    let yesBtn = document.createElement('button');
                    yesBtn.textContent = 'oui';
                    dialog.appendChild(yesBtn);

                    let noBtn = document.createElement('button');
                    noBtn.textContent = 'non';
                    dialog.appendChild(noBtn);

                    yesBtn.addEventListener('click', () => {
                        window.removeEventListener('click', onClick)
                        talk(avatar, mixer)
                        displayTextOnDialog("Alors… les ingrédients pour 4 personnes : 4 avocats (pas trop durs, sinon vous ne pourrez pas les écraser) 2 tomates bien fermes 2 oignons rouges 1 citron vert 1 botte de coriandre De la sauce Cholula ⚠️ Ne mettez surtout pas de sel, sinon les avocats vont noircir.", () => {
                            stay(avatar, mixer)
                            let next1 = document.createElement('button');
                            next1.textContent = 'suivent';
                            dialog.appendChild(next1);
                            next1.addEventListener('click', () => {
                                talk(avatar, mixer)
                                window.addEventListener('click', onClick)
                                displayTextOnDialog('Coupez les oignons et les tomates en petits dés. Pressez le jus du citron vert. Hachez la coriandre. Dans un plat suffisamment grand, épluchez et écrasez les avocats (surtout sans utiliser de mixeur). Ajoutez les oignons, les tomates et la coriandre dans le plat. Versez un peu de sauce Cholula. Mélangez bien… et c’est prêt ! 🥑 💡 Vous pouvez le conserver dans un plat en verre au réfrigérateur. N’utilisez pas de plat en métal, cela ferait noircir les avocats.', () => {
                                    stay(avatar, mixer)
                                })
                            })
                        })
                    })

                    noBtn.addEventListener('click', () => {
                        displayTextOnDialog("Une prochaine fois alors 😉")
                    })
                })
            }


        }

    ]

    const onTouch = (event) => {
        event.preventDefault(); // empêche le scroll ou d'autres actions du navigateur
        const touch = event.touches[0]; // on prend le premier doigt
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(avatar, true);
        if (intersects.length > 0) {
            focusAvatar(avatar, camera, controls, renderer, scene, () => {
                if (counter === 0) {
                    counter++
                    displaydialog(() => {
                        const text = "salut je m'appelle amine. Je suis ici pour repondre a vos questions utilisez les buttons pour me poser des questions ou me faire faire des actions"
                        talk(avatar, mixer)
                        displayTextOnDialog(text, () => {
                            stay(avatar, mixer)
                            displayPopUpQuestions(() => {
                                displayBtnsQuestions(questions, () => {
                                    addEventbtnsQuestions(questions)
                                })
                            })
                        })
                    })
                }
            })
        }
    }
    // --- Clic sur avatar --
    const onClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        if (!avatar) return;

        const intersects = raycaster.intersectObject(avatar, true);
        if (intersects.length > 0) {
            focusAvatar(avatar, camera, controls, renderer, scene, () => {
                if (counter === 0) {
                    counter++
                    displaydialog(() => {
                        const text = "salut je m'appelle amine. Je suis ici pour repondre a vos questions utilisez les buttons pour me poser des questions ou me faire faire des actions"
                        talk(avatar, mixer)
                        displayTextOnDialog(text, () => {
                            stay(avatar, mixer)
                            displayPopUpQuestions(() => {
                                displayBtnsQuestions(questions, () => {
                                    addEventbtnsQuestions(questions)
                                })
                            })
                        })
                    })
                }
            })
        }
    }
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onTouch);
}

