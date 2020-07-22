import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

interface Development {
  tipText: string;
  url: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  contentText: string;
}

interface Developments {
  sourceCode: Development;
  uxFlowchart: Development;
  wireframes: Development;
  erd: Development;
  infraDiagram: Development;
}

const developments: Developments = {
  sourceCode: {
    tipText: "mission.techStack.sourceCode.toolTip.content",
    url: "https://github.com/Sapphire-Labs/Hackathon",
    Icon: GitHubIcon,
    contentText: "mission.techStack.sourceCode.title.name",
  },
  wireframes: {
    tipText: "Explore the latest high-fidelity wireframes for our website",
    url: "https://www.figma.com/file/5yWNhxAPTHPdrHd0U5X2QE/FakeCheck-High-Fidelity-Wireframes-v1?node-id=0%3A1",
    Icon: PhotoLibraryIcon,
    contentText: "Wireframes",
  },
  uxFlowchart: {
    tipText: "Explore the high-level user experience flow of our website through a colour-coded flowchart",
    url: "https://miro.com/app/board/o9J_kpJ4dHw=/",
    Icon: DescriptionIcon,
    contentText: "User Experience Flowchart",
  },
  erd: {
    tipText: "mission.techStack.erd.toolTip.content",
    url: "https://app.lucidchart.com/invitations/accept/527e1e63-d836-49d4-8b2e-c389c2294a27",
    Icon: DescriptionIcon,
    contentText: "mission.techStack.erd.title.name",
  },
  infraDiagram: {
    tipText: `Explore a high-level diagrammatic overflow of the various architecture components that
      help run this website`,
    url: "",
    Icon: DescriptionIcon,
    contentText: "Infrastructure Diagram",
  },
};

export default developments;
