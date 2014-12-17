using Keyroll.KVM;
using Keyroll.Shell;
using Sartrey.UI.WinForms;
using System.IO;
using System.Text;

namespace Keyroll
{
    public class ClientKVMShell : KVMShell
    {
        public override void Shell(object model)
        {
            var ui = new KVMMainUI();
            ui.Model = model as Memory;
            var window = new Window(ui);
            window.ShowDialog();
        }

        public override Stream Save(object model)
        {
            var bytes = Encoding.UTF8.GetBytes((model as Memory).ToXML().ToString());
            var stream = new MemoryStream(bytes);
            return stream;
        }
    }
}
