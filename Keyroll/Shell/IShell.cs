using System.IO;

namespace Keyroll.Shell
{
    public interface IShell
    {
        bool Support(string mime);

        object Load(Stream stream);

        Stream Save(object model);

        void Shell(object model);
    }
}
