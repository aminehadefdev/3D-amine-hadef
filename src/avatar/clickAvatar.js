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
import { AudioListener, Audio, AudioLoader } from "three";




export function clickAvatar(avatar, camera, controls, renderer, scene, mixer) {
    let isOcuped = false
    const talkAndStay = (text) => {
        if (!isOcuped) {
            isOcuped = true
            talk(avatar, mixer)
            displayTextOnDialog(text, () => {
                isOcuped = false
                stay(avatar, mixer)
            })
        }
    }
    const yesOrNo = (cbYes, cbNo) => {
        let yesBtn = document.createElement('button');
        yesBtn.textContent = 'oui';
        dialog.appendChild(yesBtn);

        let NoBtn = document.createElement('button');
        NoBtn.textContent = 'No';
        dialog.appendChild(NoBtn);

        yesBtn.addEventListener('click', cbYes)
        NoBtn.addEventListener('click', cbNo)


    }
    // --- Raycaster pour le clic ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let counter = 0

    const questions = [
        {
            "question": "Salut, t’es qui toi?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Hey 👋 moi c’est Amine, un hacker du web (version propre hein 😅) passionné par le code, les interfaces bien faites et les défis techniques! 🤓 Dyslexique de père en fils depuis 1991 📚 (S’il y a des fautes d’orthographe, n’hésitez pas à me le dire 😅) amine.hadef.dev@gmail.com")
            }
        },
        {
            'question': 'Tu as quel âge?',
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talkAndStay("J’ai " + getAgeFromDate('22/11/1991') + " ans, je suis né le 22/11/1991. Je trouve ma date d’anniversaire super stylée : elle est complètement en miroir 😉")
            }
        },
        {
            'question': 'Tu habite où?',
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talkAndStay("J'habite à Clamart dans le 92.")
            }
        },
        {
            "question": "Tu viens d’où?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Je viens d’Algérie DZ squad, j'ai grandi en france, j’ai posé mes valises à Clamart 🗼. Ici, je code, je crée, et je carbure au thé ☕ et à la musique 🎧.")
            }
        },
        {
            "question": "Pourquoi t’as choisi le développement?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Parce que j’adore apprendre et comprendre comment tout marche ! Et aussi parce que faire planter un programme et réussir à le réparer, c’est un peu comme vaincre un boss de jeu vidéo 💪🎮. Le developpement m'offre un vrais defi il y a toujours quelque chose a apprende ou a revoir")
            }
        },
        {
            "question": "Tu as des préférences sur le secteur de ta future entreprise?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Peu importe le secteur 🚀. Tant que l’entreprise a de l'éthique et respecte ses équipes 🙌💡.")
            }
        },
        {
            "question": "T’es fort en quoi exactement?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                if (!isOcuped) {
                    isOcuped = true
                    talk(avatar, mixer)
                    displayTextOnDialog("Mon terrain de jeu ? Le web, tout simplement 😎. Je manie le PHP 🐘 (avec Symfony et Laravel). Le JavaScript ⚡ (et ses acolytes React, React Native, Vue, Node, Express, jQuery). Sans oublier le HTML, le CSS, Tailwind, Bootstrap et un peu de templating façon Twing et Phtml 🎨. Côté bases de données, je parle couramment MySQL, PostgreSQL et SQL pur jus 💾.", () => {
                        stay(avatar, mixer)
                        let btNext = document.createElement('button');
                        btNext.textContent = 'suivant->';
                        dialog.appendChild(btNext);
                        btNext.addEventListener('click', () => {
                            window.removeEventListener('click', onClick)
                            talk(avatar, mixer)
                            displayTextOnDialog(" Je bricole aussi avec FastAPI 🐍. J’orchestre le tout dans Docker 🐳, je versionne avec Git et SVN. Et je garde mes serveurs bien dressés sur Linux, MacOS ou Windows 💻. Ajoute à ça du TDD, du BDD, un peu de DDD, des principes SOLID, et une touche d’Agile (Scrum & Kanban style) 🚀. Bref, full-stack de la tête aux pieds, mais avec un petit cœur ❤️ qui bat fort pour le backend !", () => {
                                isOcuped = false
                                stay(avatar, mixer)
                                window.addEventListener('click', onClick)
                            })
                        })
                    })
                }
            }
        },
        {
            "question": "C’est quoi ton super-pouvoir de développeur?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Automatiser tout ce qui bouge 😎. Si je peux éviter de refaire la même tâche deux fois, je la code une bonne fois pour toutes ⚙️.")
            }
        },
        {
            "question": "T’as déjà bossé où?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Chez Adelios, Hexagon, Carte Blanche Conseil, et talent work agency. Des projets variés, du web, des applis mobile, du React, du PHP du python... bref, j’ai touché un peu à tout 💻✨.")
            }
        },
        {
            "question": "Ton projet préféré?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Une borne pour gérer les flux d’entrée de parkings de bus 🚍 à Paris. J’ai repensé toute la maquette et boum 💥 : 70% d’erreurs en moins. Pas mal non ?")
            }
        },
        {
            "question": "T’as déjà cassé un site en prod? 😅",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Heuuuuuuuuuu… peut-être 👀 Mais chut, on va dire que c’était pour tester la robustesse du système 🤫. Et ce n’était pas un site dont j’avais la charge, ça explique tout.")
            }
        },
        {
            "question": "Qu’est-ce qui te motive dans ton métier?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Résoudre des problèmes, apprendre sans arrêt et voir des idées devenir réelles. Et aussi le thé, beaucoup de thé ☕.")
            }
        },
        {
            "question": "Tu préfères travailler seul ou en équipe?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Les deux! Seul, je trace comme un ninja 🥷. En équipe, j’apprends, je partage, et je rigole (parfois trop 😄).")
            }
        },
        {
            "question": "Tu veux aller où maintenant?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Rejoindre une équipe qui innove, où je peux grandir techniquement et humainement. Et si y’a des challenges, j’arrive direct 💪.")
            }
        },
        {
            "question": "Si tu n’étais pas développeur?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Quand j’étais petit, je rêvais d’être éboueur 🚛✨(oui c'est chelou pour un gosse). J’adorais leurs énormes camions qui faisaient vroum vroum partout 😎💨. Mais le code m’a vite appâté 💻🔥😄")
            }
        },
        {
            "question": "Ton langage préféré?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Pas de jaloux entre les langages… sauf peut-être le PHP 🐘, mon premier amour de codeur 💘 — c’est lui qui m’a appris à parler « ordinateur » !")
            }
        },
        {
            'question': "Tu as fait ce site avec quelles technologies?",
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                talkAndStay("J’ai créé ce site avec Three.js, Vite, Blender et Mixamo. Le gros challenge avec ce projet a été d’apprendre la 3D. Je ne dirais pas que je suis spécialiste. Mais j’ai maintenant de bonnes bases.")

            }
        },
        {
            "question": "Tu codes la nuit?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Disons que mes meilleures idées arrivent souvent à 2h du matin 🌙💡.")
            }
        },
        {
            "question": "Si ton code était un plat?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Un couscous bien structuré : chaque ingrédient à sa place, un peu épicé, et toujours du fait maison 🍲😋.")
            }
        },
        {
            "question": "Tu préfères les tabs ou les espaces?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Ah, la question qui fâche 😏… Tabs, évidemment. Les espaces, c’est pour les poètes.")
            }
        },
        {
            "question": "Tu t’y connais en intelligence artificielle ?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Pas expert, mais je discute souvent avec ChatGPT 😅.")
            }
        },
        {
            "question": "Et ton motto?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Automatise tout ce que tu peux, et fais le reste avec style 😎.")
            }
        },
        {
            'question': "Tu sais danser la salsa?",
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                if (!isOcuped) {
                    isOcuped = true
                    talk(avatar, mixer)
                    displayTextOnDialog("En vrai, non… mais ici je sais danser la salsa. Vous voulez une démo?", () => {
                        stay(avatar, mixer)
                        yesOrNo(() => {
                            window.removeEventListener('click', onClick)
                            displayTextOnDialog("3 4 tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............")
                            moveCameraToTopView(avatar, camera, controls, renderer, scene, () => {
                                const listener = new AudioListener();
                                camera.add(listener)
                                const sound = new Audio(listener);
                                // load a sound and set it as the Audio object's buffer
                                const audioLoader = new AudioLoader();
                                audioLoader.load("/audios/salsa.mp3", function (buffer) {
                                    sound.setBuffer(buffer);
                                    sound.setLoop(true);
                                    sound.setVolume(0.5);
                                    sound.play();
                                    salsa(avatar, mixer, () => {
                                        sound.stop()
                                        isOcuped = false
                                        stay(avatar, mixer)
                                        focusAvatar(avatar, camera, controls, renderer, scene, () => {
                                            displayTextOnDialog("Wahooooo, c’était trop cool !")
                                            window.addEventListener('click', onClick)
                                        })
                                    })
                                });

                            });
                        }, () => {

                            isOcuped = true
                            displayTextOnDialog("Une prochaine fois alors 😉.", () => {
                                isOcuped = false
                            })

                        })
                        // let yesBtn = document.createElement('button');
                        // yesBtn.textContent = 'oui';
                        // dialog.appendChild(yesBtn);

                        // let noBtn = document.createElement('button');
                        // noBtn.textContent = 'non';
                        // dialog.appendChild(noBtn);

                        // noBtn.addEventListener('click', () => {
                        //     displayTextOnDialog("Une prochaine fois alors 😉.")
                        // })

                        // yesBtn.addEventListener('click', () => {
                        //     window.removeEventListener('click', onClick)
                        //     displayTextOnDialog("3 4 tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............ tcha tcha tchtchatcha ............")
                        //     moveCameraToTopView(avatar, camera, controls, renderer, scene, () => {
                        //         const listener = new AudioListener();
                        //         camera.add(listener)
                        //         const sound = new Audio(listener);
                        //         // load a sound and set it as the Audio object's buffer
                        //         const audioLoader = new AudioLoader();
                        //         audioLoader.load("/audios/salsa.mp3", function (buffer) {
                        //             sound.setBuffer(buffer);
                        //             sound.setLoop(true);
                        //             sound.setVolume(0.5);
                        //             sound.play();
                        //             salsa(avatar, mixer, () => {
                        //                 sound.stop()
                        //                 isOcuped = false
                        //                 stay(avatar, mixer)
                        //                 focusAvatar(avatar, camera, controls, renderer, scene, () => {

                        //                     displayTextOnDialog("Wahooooo, c’était trop cool !")
                        //                     window.addEventListener('click', onClick)
                        //                 })
                        //             })
                        //         });

                        //     })
                        // });
                    })
                }
            }
        },
        {
            'question': "tu as des passions?",
            'id': "btn-question-" + uuidv4(),
            'actions': () => {
                if (!isOcuped) {
                    isOcuped = true
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
                            displayTextOnDialog("Alors… les ingrédients pour 4 personnes : 4 avocats (pas trop durs, sinon vous ne pourrez pas les écraser). 2 tomates bien fermes. 2 oignons rouges. 1 citron vert. 1 botte de coriandre. De la sauce Cholula ⚠️ Ne mettez surtout pas de sel, sinon les avocats vont noircir.", () => {
                                stay(avatar, mixer)
                                let next1 = document.createElement('button');
                                next1.textContent = 'suivant->';
                                dialog.appendChild(next1);
                                next1.addEventListener('click', () => {
                                    talk(avatar, mixer)
                                    window.addEventListener('click', onClick)
                                    displayTextOnDialog('Coupez les oignons et les tomates en petits dés. Pressez le jus du citron vert. Hachez la coriandre. Dans un plat suffisamment grand, épluchez et écrasez les avocats (surtout sans utiliser de mixeur). Ajoutez les oignons, les tomates et la coriandre dans le plat. Versez un peu de sauce Cholula. Mélangez bien… et c’est prêt !🥑💡', () => {
                                        stay(avatar, mixer)
                                    })
                                })
                            })
                        })
                        noBtn.addEventListener('click', () => {
                            displayTextOnDialog("Une prochaine fois alors 😉.")
                        })
                    })
                }
            }


        },
        {
            "question": "Tu aimes voyager?",
            "id": "btn-question-" + uuidv4(),
            "actions": () => {
                talkAndStay("Avant, non, je détestais voyager 😒. Je trouvais que ça n’avait aucun intérêt. Mais maintenant, on ne peut plus m’arrêter ! 💪✈️ En deux ans, j’ai visité : l'Espagne 🏖️🍷 le Portugal 🏰🍴 la Malaisie 🌴🏞️ le Cambodge 🛕🌅 les Pays-Bas 🚲🌷 Et maintenant, je voudrais aller en Colombie 🌄☕ en Angola 🏝️🦁 a la Nouvelle-Zélande 🏔️🛶 …et après… bref, vous avez compris 😄🌍🧳✈️.")
            }
        },

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
                        const text = "Salut je m'appelle amine. Je suis ici pour repondre a vos questions. Utilisez les buttons pour me poser des questions."
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
        event.preventDefault()

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
                        const text = "Salut je m'appelle amine. Je suis ici pour repondre a vos questions. Utilisez les buttons pour me poser des questions."
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

