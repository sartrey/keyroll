using System.IO;

namespace Keyroll.Shell
{
    public interface IShell
    {
        bool Support(string mime);

        object Load(Stream stream);

        void Shell(object model);
    }
}
